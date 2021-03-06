import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskDto } from './dtos/tasks.dto';

@Entity()
export class Task {
  constructor(taskDto?: TaskDto) {
    if (!taskDto) {
      return;
    }
    this.title = taskDto.title;
    this.description = taskDto.description;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @Column('varchar')
  status = TaskStatus.OPEN;

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  @ManyToOne(type => User, user => user.tasks)
  user: User
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
