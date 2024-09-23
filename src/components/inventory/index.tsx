import React, { useState } from 'react';
import { useExitListener } from '../../hooks/useExitListener';
import useNuiEvent from '../../hooks/useNuiEvent';
import { useAppDispatch } from '../../store';
import { closeContextMenu } from '../../store/contextMenu';
import { refreshSlots, setAdditionalMetadata, setupInventory } from '../../store/inventory';
import { closeTooltip } from '../../store/tooltip';
import type { Inventory as InventoryProps } from '../../typings';
import Tooltip from '../utils/Tooltip';
import Fade from '../utils/transitions/Fade';
import InventoryContext from './InventoryContext';
import InventoryControl from './InventoryControl';
import InventoryHotbar from './InventoryHotbar';
import LeftInventory from './LeftInventory';
import RightInventory from './RightInventory';

const Inventory: React.FC = () => {
  const [inventoryVisible, setInventoryVisible] = useState(false);
  const dispatch = useAppDispatch();

  useNuiEvent<boolean>('setInventoryVisible', setInventoryVisible);
  useNuiEvent<false>('closeInventory', () => {
    setInventoryVisible(false);
    dispatch(closeContextMenu());
    dispatch(closeTooltip());
  });
  useExitListener(setInventoryVisible);

  useNuiEvent<{
    leftInventory?: InventoryProps;
    rightInventory?: InventoryProps;
  }>('setupInventory', (data) => {
    dispatch(setupInventory(data));
    !inventoryVisible && setInventoryVisible(true);
  });

  useNuiEvent('refreshSlots', (data) => dispatch(refreshSlots(data)));

  useNuiEvent('displayMetadata', (data: Array<{ metadata: string; value: string }>) => {
    dispatch(setAdditionalMetadata(data));
  });

  return (
    <>
      <Fade in={inventoryVisible}>
        <div className="bg-gradient"></div>
        <div className="inventory-wrapper">
          <LeftInventory />
          <InventoryControl />
          <RightInventory />
          <Tooltip />
          <InventoryContext />
        </div>
      </Fade>
      <InventoryHotbar />
    </>
  );
};

export default Inventory;
