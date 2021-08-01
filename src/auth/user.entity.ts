import { Task } from 'src/tasks/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({unique: true})
  username: string;
  @Column({unique: true})
  email: string;
  @Column()
  hashedPassword: string;

  @OneToMany(type => Task, task => task.user, {eager: true})
  tasks: Task[];
}