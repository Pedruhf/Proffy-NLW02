import React from 'react';

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars.githubusercontent.com/u/39572742?v=4" alt="Pedro Freitas" />
        <div>
          <strong>Pedro Freitas</strong>
          <span>Cálculo I</span>
        </div>
      </header>

      <p>
        O cara é bom, tem nem condições de ter oto cara que sabe tanto calculo como esse mlk sabe
        <br /><br />
        Joga fácil d++. Só confia.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 50,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;