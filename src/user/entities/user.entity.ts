import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  frist_name: string;

  @Column('text')
  last_name: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  status: number;
}
