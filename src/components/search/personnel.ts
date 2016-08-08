interface Personnel {
  _id: any,
  name: string,
  surname: string,
  currentRole: Role[],
  Roles: Role[],
  qualifications: Certificate[],
  trainings: Certificate[],
  occupation: string
}

interface Project {
  id: string,
  text: string,
  location: string,
  projectExperience: string[],
  phaseExperience: string[]
}

interface Certificate {
  _id: any,
  name: string,
  certificateNumber: number,
  institution: string
}