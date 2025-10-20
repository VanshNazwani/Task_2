import { Task } from '@/types/task';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-muted text-muted-foreground' },
  in_progress: { label: 'In Progress', color: 'bg-warning text-warning-foreground' },
  done: { label: 'Done', color: 'bg-success text-success-foreground' }
};

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const statusInfo = statusConfig[task.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
            <CardDescription className="mt-1">{task.description}</CardDescription>
          </div>
          <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{task.assignedTo}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
