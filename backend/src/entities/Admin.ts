import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    fullName: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string
}
