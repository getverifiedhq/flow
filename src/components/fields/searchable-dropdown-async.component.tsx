import { Fragment, useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import { useFetch } from "../../hooks";

type Item<T = object> = { [key: string]: string } & T;

export function SearchableDropdownAsync<T>(props: {
  fn: (value: string | null) => Promise<Array<Item<T>>>;
  placeholder: string;
  onSelect: (value: Item<T> | null) => void;
  value: Item<T> | null;
}) {
  const [open, setOpen] = useState(false);

  const result = useFetch({
    auto: false,
    dependencies: [open],
    fn: async (value: string | null) => props.fn(value),
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
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);

        result.fetch(null);
      }}
      onClose={() => setOpen(false)}
      value={props.value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label || ""}
      options={result.isLoading ? [] : result.result || []}
      loading={result.isLoading}
      noOptionsText={props.placeholder}
      onChange={(_, value) => {
        setOpen(false);

        props.onSelect(value);
      }}
      onInputChange={(_, value) => handleOnInputChange(value)}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          label=""
          placeholder={props.placeholder}
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
          }}
          sx={{ backgroundColor: "white", mb: 2 }}
        />
      )}
    />
  );
}
