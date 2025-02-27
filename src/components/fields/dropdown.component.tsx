import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IDropdownField, IFieldProps } from "../../core";
import { SearchableDropdownAsyncComponent } from "../fields/searchable-dropdown-async.component";

export function DropdownComponent(props: IFieldProps<IDropdownField>) {
  if (props.field.choicesByUrl) {
    return (
      <SearchableDropdownAsyncComponent
        disabled={props.disabled}
        error={props.error}
        field={props.field}
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        value={props.value}
      />
    );
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel shrink>{props.field.title}</InputLabel>
      <Select
        disabled={props.disabled}
        error={props.error}
        id={props.field.name}
        label={props.field.title}
        name={props.field.name}
        notched
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        value={props.value}
      >
        {(props.field.choicesOrder
          ? (props.field.choices || []).sort()
          : props.field.choices || []
        ).map((x, index: number) => (
          <MenuItem key={index} value={x}>
            {x}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
