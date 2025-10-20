import { useState } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { TaskDialog } from '@/components/TaskDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FolderKanban } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demonstration
const MOCK_PROJECT_ID = 'project-1';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Setup project structure',
      description: 'Initialize the project with proper folder structure and dependencies',
      status: 'done',
      dueDate: '2025-10-15',
      assignedTo: 'Rajesh Kumar',
      projectId: MOCK_PROJECT_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add JWT-based authentication with login and signup',
      status: 'in_progress',
      dueDate: '2025-10-22',
      assignedTo: 'Priya Sharma',
      projectId: MOCK_PROJECT_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Design database schema',
      description: 'Create tables for tasks, projects, and users',
      status: 'todo',
      dueDate: '2025-10-25',
      assignedTo: 'Amit Patel',
      projectId: MOCK_PROJECT_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      ));
      toast.success('Task updated successfully');
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
      toast.success('Task created successfully');
    }
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Task deleted successfully');
  };

  const filteredTasks = statusFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === statusFilter);

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderKanban className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Task Manager</h1>
                <p className="text-muted-foreground">Organize and track your project tasks</p>
              </div>
            </div>
            <Button onClick={() => { setEditingTask(null); setDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as TaskStatus | 'all')} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All ({taskCounts.all})</TabsTrigger>
            <TabsTrigger value="todo">To Do ({taskCounts.todo})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({taskCounts.in_progress})</TabsTrigger>
            <TabsTrigger value="done">Done ({taskCounts.done})</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tasks found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => { setEditingTask(null); setDialogOpen(true); }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveTask}
        task={editingTask}
        projectId={MOCK_PROJECT_ID}
      />
    </div>
  );
};

export default Index;
