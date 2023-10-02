class Person {
    private name: string;
    private gender: string
    private maritalStatus: string

    constructor(name: string, gender: string, maritalStatus: string) {
        this.name = name;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
    }
    getName(): string {
        return this.name;
    }
    getGender(): string {
        return this.gender;
    }
    getMaritalStatus(): string {
        return this.maritalStatus;
    }
}

interface Criteria {
    meetCriteria(persons: Array<Person>): Array<Person>;
}

class CriteriaMale implements Criteria {
    meetCriteria(persons: Person[]): Person[] {
        const malePersons: Array<Person> = [];
        for (const person of persons) {
            if (person.getGender() === "MALE") {
                malePersons.push(person)
            }
        }
        return malePersons;
    }
}

class CriteriaFemale implements Criteria {
    meetCriteria(persons: Person[]): Person[] {
        const femalePersons: Array<Person> = [];
        for (const person of persons) {
            if (person.getGender() === "FEMALE") {
                femalePersons.push(person)
            }
        }
        return femalePersons;
    }
}

class CriteriaSingle implements Criteria {
    meetCriteria(persons: Person[]): Person[] {
        const singlePersons: Array<Person> = [];
        for (const person of persons) {
            if (person.getGender() === "SIGNLE") {
                singlePersons.push(person)
            }
        }
        return singlePersons;
    }
}

// 过滤
class AndCriteria implements Criteria {
    criteria: Criteria[];

    constructor(...criteria: Criteria[]) {
        this.criteria = criteria;
    }
    meetCriteria(persons: Person[]): Person[] {
        let filterPersons: Person[] = [];
        this.criteria.forEach(c => filterPersons = c.meetCriteria(filterPersons))
        return filterPersons;
    }
}
class OrCriteria implements Criteria {
    criteria: Criteria[];

    constructor(...criteria: Criteria[]) {
        this.criteria = criteria;
    }
    meetCriteria(persons: Person[]): Person[] {
        let filterPersons: Person[] = persons;
        let tmp: Person[] = [];
        this.criteria.forEach(c => {
            const ret = c.meetCriteria(filterPersons);
            tmp = filterPersons.filter(c => ret.includes(c));
            filterPersons = [...tmp];
        })
        return filterPersons;
    }
}