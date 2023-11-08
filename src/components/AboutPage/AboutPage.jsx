import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>The existing wedding industry has no shortage of RSVP solutions, 
          however most wedding websites focus on the whole wedding experience.
          While this works for a lot of couples, there are some who just want 
          management when it comes to just one experience. </p>
      </div>
    </div>
  );
}

export default AboutPage;
