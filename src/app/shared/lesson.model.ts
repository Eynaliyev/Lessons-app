export interface Employee{
	name: string
}
export interface Language{
	name: string
}
export interface Topic{
    name: string,
    date: string,
    time: string,
    about: string
}
export interface Participant{
    name: string,
    status: string,
    specialty: string,
    group: string
}

export class Lesson {
  constructor(
    public id?: number,
    public name?: string,
    public studentCount?: number,
    public language?: string,
    public year?: string,
    public semester?: string,
    public info?: string,
    public employees?: Employee[],
    public languages?: Language[],
    public nextMeeting?: string,
    public nextTopicName?: string,
    public subjectname?: string
  ) {  }
}
