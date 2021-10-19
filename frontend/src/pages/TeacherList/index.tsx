import './styles.css';
import React, { FormEvent, useEffect, useState } from "react";
import Input from "../../components/Input";

import PageHeader from '../../components/PageHeader/index';
import Select from "../../components/Select";
import TeacherItem, { Teacher } from '../../components/TeacherItem/index';
import api from "../../services/api";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const res = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(res.data as []);
  }

  useEffect(() => {
    api.get('classes').then((res: any) => {
      setTeachers(res.data);
    })
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={event => { setSubject(event.target.value) }}
            options={[
              { value: 'Cálculo I', label: 'Cálculo I' },
              { value: 'Banco de dados', label: 'Banco de dados' },
              { value: 'Desenvolvimento web', label: 'Desenvolvimento web' },
              { value: 'ReactJS', label: 'ReactJS' },
              { value: 'VueJS', label: 'VueJS' },
              { value: 'Algoritmos', label: 'Algoritmos' },
              { value: 'PHP', label: 'PHP' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={event => { setWeek_day(event.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Horário"
            value={time}
            onChange={event => { setTime(event.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
}

export default TeacherList;