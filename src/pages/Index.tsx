import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TodoForm } from '@/components/todo/todo-form';
import { TodoItem } from '@/components/todo/todo-item';
import { TodoFilters } from '@/components/todo/todo-filters';
import { useTodos } from '@/hooks/use-todos';
import { TodoStatus } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Index = () => {
  const [filter, setFilter] = useState<TodoStatus>('all');
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, getFilteredTodos } = useTodos();

  const filteredTodos = getFilteredTodos(filter);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">My Todo List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TodoForm onAdd={addTodo} />
            
            {todos.length > 0 && (
              <>
                <TodoFilters
                  currentFilter={filter}
                  onFilterChange={setFilter}
                  activeCount={activeCount}
                  completedCount={completedCount}
                />
                
                <div className="space-y-2">
                  {filteredTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </div>

                {completedCount > 0 && (
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-gray-600">
                      {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCompleted}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear completed
                    </Button>
                  </div>
                )}
              </>
            )}

            {todos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No todos yet. Add one above!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <MadeWithApplaa />
    </div>
  );
};

export default Index;