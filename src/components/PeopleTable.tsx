import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const isSelected = (person: Person) => selectedSlug === person.slug;

  function getPersonLink(name: string, parents: Person[]) {
    const person = parents.find(p => p.name === name);

    if (!person) {
      return name;
    }

    return (
      <a
        href={`#/people/${person.slug}`}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {name}
      </a>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(pers => (
          <tr
            className={classNames({
              'has-background-warning': isSelected(pers),
            })}
            data-cy="person"
            key={pers.name}
          >
            <td>
              <a
                href={`#/people/${pers.slug}`}
                className={classNames({ 'has-text-danger': pers.sex === 'f' })}
              >
                {pers.name}
              </a>
            </td>

            <td>{pers.sex}</td>
            <td>{pers.born}</td>
            <td>{pers.died}</td>
            <td>
              {pers.motherName ? getPersonLink(pers.motherName, people) : '-'}
            </td>
            <td>
              {pers.fatherName ? getPersonLink(pers.fatherName, people) : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
