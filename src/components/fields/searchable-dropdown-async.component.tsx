import { Fragment, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import axios from "axios";
import { useFetch } from "../../hooks";
import { IDropdownField, IFieldProps } from "../../core";

export function SearchableDropdownAsyncComponent(
  props: IFieldProps<IDropdownField>
) {
  const [open, setOpen] = useState(false);

  const result = useFetch({
    auto: false,
    dependencies: [open],
    // fn: async (value: string | null) =>
    //   props.field.choices
    //     .filter((x) => !value || x.toLowerCase().includes(value.toLowerCase()))
    //     .map((x) => {
    //       return {
    //         id: x,
    //         label: x,
    //       } as any;
    //     }),
    fn: async (value: string | null) => {
      if (!props.field.choicesByUrl) {
        return [];
      }
      const response = await axios.get<Array<any>>(
        props.field.choicesByUrl.url
      );

      return response.data.filter(
        (x) =>
          !value ||
          (props.field.choicesByUrl &&
            x[props.field.choicesByUrl.titleName]
              .toLowerCase()
              .includes(value.toLowerCase()))
      );
    },
  });

  const handleOnInputChange = useMemo(
    () =>
      debounce((value) => {
        result.fetch(value);
      }, 1000),
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
