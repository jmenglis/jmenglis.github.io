'use strict';

window.onload = function() {
  const currentdate = new Date();
  const dateTime =
    'The date is currently: ' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getDate() +
    '/' +
    currentdate.getFullYear();
  console.log('Welcome to the my Portfolio.');
  console.log('I hope you enjoy what you find here.');
  console.log('Please note that you can reach to me at josh@joshenglish.com.');
  console.log(
    'Remember you can change the world with each line of code you write.'
  );
  console.log(dateTime);
};

Vue.component('je-projects', {
  props: ['project', 'closeItem'],
  template: `<div class="overlay">
      <div class="popup">
        <h2>{{project.title}}</h2>
        <a class="close" @click.prevent="closeItem">x</a>
        <div class="content">
          <strong>Summary: </strong> {{project.summary}}
          <br>
          <br>
          <strong>Technologies Used: </strong> {{project.technologies}}
          <br>
          <br>
          <strong>Project Status: </strong> {{ project.status }}
          <br>
          <br>
          <strong v-if="project.problems">Unsolved Problems: </strong> {{ project.problems }}
        </div>
    </div>`,
});

let app = new Vue({
  el: '#app',
  data: {
    title: 'Josh English',
    description:
      'I am a Full Stack Software Engineer with passion for beautiful end products.  I want to make it easier for people to communicate with web and mobile applications while enjoying seamless experiences and great performance.  I enjoy music, natural language processing, coffee and good food.',
    skills: {
      languages: ['HTML', 'Javascript', 'C#', 'Ruby', 'Python'],
      webdev: ['CSS3', 'SASS', 'LESS', 'PostCSS', 'Webpack 2.0', 'Nodejs', 'Express', 'Hapi', 'ReactJS', 'Redux', 'ImmutableJS', 'AngularJS', 'jQuery', '.NET', 'VueJS', 'Sinatra', 'Rails', 'Gulp', 'Grunt', 'RivetsJS', 'Handlebars'],
      database: ['MongoDb', 'PostgreSQL', 'OracleSQL', 'Microsoft SQL Server', 'T-SQL', 'PL/SQL', 'MySQL'],
      testing: ['Mocha', 'Chai', 'RSpec', 'Jest'],
      other: ['Git', 'VCS'],
      deployment: ['Docker', 'AWS', 'Linux', 'Azure', 'Ansible', 'Heroku'],
    },
    projects: [{
      title: 'desirelist 1.0',
      description: 'Taking the guesswork out of gifting',
      summary: 'Worked with a small team to implement features and changes to the site.',
      technologies: 'Jade, Javascript, HTML5, SASS, RivetsJS, Nodejs, Express, Mongodb, Grunt, Ansible',
      projectLink: 'http://legacy.desirelist.com',
      status: 'Deprecated',
    }],
    displayOverlay: false,
    project: {},
  },
  mounted() {
    let typed = new Typed(this.$refs.typedElement, {
      strings: [
        'Web Developer.^2000',
        'Builder.^2000',
        'Growth Hacker.^2000',
        'FinTech Guru.^2000',
        'Maker.^2000',
      ],
      typeSpeed: 25,
      loop: true,
    });
  },
  methods: {
    isLast(obj, index) {
      if (obj.length - 1 === index) {
        return true;
      } else {
        return false;
      }
    },
    displayItem(project) {
      this.displayOverlay = true;
      this.project = project;
      console.log(this.displayOverlay, this.project);
    },
    closeItem() {
      this.displayOverlay = false;
      this.project = {};
    },
  }
});
