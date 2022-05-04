import { ControlGroup, Slider, Switch, InputGroup } from "@blueprintjs/core";
import { useContext } from "react";

import { SettingsContext } from '../../context/settings.js';

function Controls() {
  const {
    showCompleted,
    toggleShowCompleted,
    itemQty,
    handleItemQty,
    sortParams,
    handleSortParams,
  } = useContext(SettingsContext);

  function handleFilterInput(e) {
    e.preventDefault();
    handleSortParams(e.target.value);
  }

  function handleSlider(value) {
    // e.preventDefault();
    handleItemQty(value);
  }

  return (
    <ControlGroup>
      <InputGroup value={sortParams} onChange={handleFilterInput} />
      <Switch label="Show completed?" checked={showCompleted} onChange={toggleShowCompleted} />
      <Slider min={3} onRelease={handleSlider} initialValue={itemQty} />
      <span>Items per page</span>
    </ControlGroup>
  );
}

export default Controls;