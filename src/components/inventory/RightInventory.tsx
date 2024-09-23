import { useAppSelector } from '../../store';
import { selectRightInventory } from '../../store/inventory';
import InventoryGrid from './InventoryGrid';

const RightInventory: React.FC = () => {
  const rightInventory = useAppSelector(selectRightInventory);

  return <InventoryGrid inventory={rightInventory} className={'right-inventory-wrapper'} />;
};

export default RightInventory;
