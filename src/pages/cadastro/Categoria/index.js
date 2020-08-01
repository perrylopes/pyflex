import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormFeild from '../../../components/FormFeild';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import config from '../../../config';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const { values, handleChange, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategotias] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;
    fetch(URL_CATEGORIES)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategotias([
          ...resposta,
        ]);
      });

    // setTimeout(() => {
    //   setCategotias([
    //     ...categorias,
    //     {
    //       id: 1,
    //       nome: 'Front End',
    //       descricao: 'Uma categoria bacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //     {
    //       id: 2,
    //       nome: 'Back End',
    //       descricao: 'Uma categoria bacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //   ]);
    // }, 4 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria :
        {values.titulo}
      </h1>

      <form
        onSubmit={function handleSubmit(evt) {
          evt.preventDefault();
          setCategotias([...categorias, values]);
          categoriasRepository.createCategory(
            {
              id: categorias.length + 1,
              titulo: values.titulo,
              cor: values.cor,
              link_extra: {
                text: values.descricao,
                url: 'https://perrylopes.com.br/',
              },
            },
          ).then(() => {
            history.push('/cadastro/video');
          });
          clearForm();
        }}
      >
        <FormFeild
          label="Nome da Categoria"
          type="text"
          value={values.titulo}
          name="titulo"
          onChange={handleChange}
        />

        <FormFeild
          label="Descrição"
          type="textarea"
          value={values.descricao}
          name="descricao"
          onChange={handleChange}
        />

        <FormFeild
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
        {categorias.length === 0 && (
          <div>
            Loading...
          </div>
        )}
      </form>

      <ul>
        {categorias.map((categoria) => <li key={categoria.titulo}>{categoria.titulo}</li>)}
      </ul>
      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
