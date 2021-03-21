import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { URLs, AUTHORS } from './constants';
import { Author } from './types';
import './Footer.scss';

const Footer: React.FC = () => {
  const renderGithubLink = (author: Author) => {
    const [firstName, surname] = author.name.split(' ');

    return (
      <Typography key={author.githubName}>
        <Link
          href={`${URLs.github}${author.githubName}`}
          target="_blank"
          rel="noreferrer"
          className="github-link">
          {`${firstName} ${surname}`}
        </Link>
      </Typography>
    );
  };

  const renderAuthors = (
    <div className="authors">{AUTHORS.map((author) => renderGithubLink(author))}</div>
  );

  return (
    <footer className="footer">
      <a className="rsschool" href={URLs.rsschool} target="_blank" rel="noreferrer">
        {' '}
      </a>
      {renderAuthors}
      <Typography className="copy">&copy; 2021</Typography>
    </footer>
  );
};

export default Footer;
