export class Survey {
  constructor(
      public ID: string,
      public Question: string,
      public Choices: string[],
      public Section: string,
      public Type: string,
      public Note: string,
      public ChoicesNote: string[]
    ) {}
}

  
