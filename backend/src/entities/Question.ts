import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Assignment } from "./Assignment"

@Entity()
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    text: string

    @Column("simple-array")
    options: string[]

    @Column("simple-array")
    correctAnswers: string[]

    @Column({ default: 1 })
    points: number

    @Column({ default: false })
    allowMultipleAnswers: boolean

    @ManyToOne(() => Assignment, (assignment) => assignment.questions)
    assignment: Assignment
}
