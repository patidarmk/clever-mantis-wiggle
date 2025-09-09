import { Button } from '@/components/ui/button';
import { TodoStatus } from '@/types/todo';

interface TodoFiltersProps {
  currentFilter: TodoStatus;
  onFilterChange: (filter: TodoStatus) => void;
  activeCount: number;
  completedCount: number;
}

export function TodoFilters({ currentFilter, onFilterChange, activeCount, completedCount }: TodoFiltersProps) {
  const filters: { value: TodoStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          variant={currentFilter === value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(value)}
        >
          {label}
          {value === 'active' && activeCount > 0 && ` (${activeCount})`}
          {value === 'completed' && completedCount > 0 && ` (${completedCount})`}
        </Button>
      ))}
    </div>
  );
}