import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormFeild from '../../../components/FormFeild';
import Button from '../../../components/Button';
import videoRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [categoryTitles, setCategoryTitles] = useState([]);
  const { handleChange, values } = useForm({
    titulo: 'Video Padrão',
    url: 'https://www.youtube.com/watch?v=IQiv1ES1PZQ',
    categoria: 'Front End',
  });
  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriaFormServer) => {
        setCategoryTitles(categoriaFormServer.map(({ titulo }) => titulo));
        setCategorias(categoriaFormServer);
      });
    setCategorias();
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(evt) => {
        const categoriaEscolhidas = categorias.find(
          (categoria) => categoria.titulo === values.categoria,
        );

        evt.preventDefault();
        videoRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhidas.id,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >
        <FormFeild
          label="Título do Video"
          type="text"
          value={values.titulo}
          name="titulo"
          onChange={handleChange}
        />

        <FormFeild
          label="URL do Video"
          type="text"
          value={values.url}
          name="url"
          onChange={handleChange}
        />

        <FormFeild
          label="Categoria"
          type="text"
          value={values.categoria}
          name="categoria"
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;
