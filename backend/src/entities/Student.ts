import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Student {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    registrationNumber: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}
