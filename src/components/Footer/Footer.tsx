import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { Author } from './types';
import './Footer.scss';

const Footer: React.FC = () => {
  const authors: Author[] = [
    { name: 'Larisa Arkaeva', githubName: 'lbratkovskaya' },
    { name: 'Maxim Chernov', githubName: 'blackymax' },
    { name: 'Nick Gurinovich', githubName: 'Gurnick013' },
    { name: 'Aliaksei Latypau', githubName: 'alexlatypov94' },
    { name: 'Alexey Teterin', githubName: 'AlexeyTeterin' },
    { name: 'Antonina Tregubova', githubName: 'Tonia-SE' },
  ];

  const renderGithubLink = (author: Author) => {
    const [firstName, surname] = author.name.split(' ');

    return (
      <Typography>
        <Link
          href={`https://github.com/${author.githubName}`}
          target="_blank"
          rel="noreferrer"
          className="github-link">
          {`${firstName} ${surname}`}
        </Link>
      </Typography>
    );
  };

  const renderAuthors = (
    <div className="authors">{authors.map((author) => renderGithubLink(author))}</div>
  );

  return (
    <footer className="footer">
      <a className="rsschool" href="https://rs.school/" target="_blank" rel="noreferrer">
        {' '}
      </a>
      {renderAuthors}
      <Typography className="copy">&copy; 2021</Typography>
    </footer>
  );
};

export default Footer;
