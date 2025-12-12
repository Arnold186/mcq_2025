import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Admin } from "./Admin"
import { Question } from "./Question"

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({ type: "text", nullable: true })
    description: string

    @Column({ default: false })
    isPublished: boolean

    @Column({ type: 'int', nullable: true })
    durationMinutes: number

    @Column({ type: 'timestamp', nullable: true })
    startTime: Date

    @Column({ type: 'timestamp', nullable: true })
    endTime: Date

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Admin)
    createdBy: Admin

    @OneToMany(() => Question, (question) => question.assignment, { cascade: true })
    questions: Question[]
}
