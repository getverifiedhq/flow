import { Fragment, useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import { useFetch } from "../../hooks";
import { IDropdownField } from "../../core";

type Item<T = object> = { [key: string]: string } & T;

export function SearchableDropdownAsync<T>(props: {
  disabled: boolean;
  error: boolean;
  field: IDropdownField;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: Item<T> | null;
}) {
  const [open, setOpen] = useState(false);

  const result = useFetch({
    auto: false,
    dependencies: [open],
    fn: async (value: string | null) =>
      props.field.choices
        .filter((x) => !value || x.toLowerCase().includes(value.toLowerCase()))
        .map((x) => {
          return {
            id: x,
            label: x,
          } as any;
        }),
  });

  const handleOnInputChange = useMemo(
    () =>
      debounce((value) => {
        result.fetch(value);
      }, 400),
    [result]
  );

  return (
    <Autocomplete
      blurOnSelect
      disabled={props.disabled}
      filterOptions={(x) => x}
      fullWidth
      id={props.field.name}
      open={open}
      // onBlur={props.handleBlur}
      onOpen={() => {
        setOpen(true);

        result.fetch(null);
      }}
      onClose={() => setOpen(false)}
      value={props.value}
      isOptionEqualToValue={(option, value) =>
        props.field.choicesByUrl
          ? option[props.field.choicesByUrl.valueName] ===
            value[props.field.choicesByUrl.valueName]
          : false
      }
      getOptionLabel={(option) =>
        props.field.choicesByUrl
          ? option[props.field.choicesByUrl.titleName]
          : ""
      }
      options={result.isLoading ? [] : result.result || []}
      loading={result.isLoading}
      noOptionsText={props.field.placeholder}
      onChange={(_, value) => {
        setOpen(false);

        props.handleChange({
          target: {
            name: props.field.name,
            value,
          },
        });
      }}
      onInputChange={(_, value) => handleOnInputChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={props.error}
          id={props.field.name}
          label={props.field.title}
          name={props.field.name}
          placeholder={props.field.placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {result.isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            },
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ mb: 2 }}
        />
      )}
    />
  );
}
