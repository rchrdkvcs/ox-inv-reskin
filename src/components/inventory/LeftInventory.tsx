import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import InventoryGrid from './InventoryGrid';

const LeftInventory: React.FC = () => {
  const leftInventory = useAppSelector(selectLeftInventory);

  return <InventoryGrid inventory={leftInventory} className={'left-inventory-wrapper'} />;
};

export default LeftInventory;
