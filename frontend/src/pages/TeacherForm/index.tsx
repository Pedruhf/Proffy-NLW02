import './styles.css';
import React, { FormEvent, useState } from "react";
import { useHistory } from 'react-router';
import api from "../../services/api";

import PageHeader from '../../components/PageHeader/index';
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from '../../assets/images/icons/warning.svg';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');


  const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '', }]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '', }
    ]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro ao tentar realizar o cadastro!');
    });

    
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const newArray = scheduleItems.map((item, index)=> {
      if (index === position) {
        return { ...item, [field]: value };
      }

      return item;
    });

    setScheduleItems(newArray);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher este formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              required
              minLength={3}
              value={name}
              onChange={(event) => { setName(event.target.value )}}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => { setAvatar(event.target.value )}}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              required
              minLength={10}
              value={whatsapp}
              onChange={(event) => { setWhatsapp(event.target.value )}}
            />
            <Textarea
              name="bio"
              label="Biografia"
              required
              value={bio}
              onChange={(event) => { setBio(event.target.value )}}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              required
              value={subject}
              onChange={(event) => { setSubject(event.target.value) }}
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
            <Input
              name="cost"
              label="Custo da hora/aula"
              required
              value={cost}
              onChange={(event) => { setCost(event.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  required
                  value={scheduleItem.week_day}
                  onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                  name="from"
                  label="Das"
                  type="time"
                  required
                  value={scheduleItem.from}
                  onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  required
                  value={scheduleItem.to}
                  onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                 />
              </div>
            );
          })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;