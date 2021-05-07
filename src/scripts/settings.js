export default function Settings(state){
  switch(state){
    case true:
      console.warn('Settings Window : Operation Running');
      window.addEventListener('click', click => {
        Overview_react(click);
        AppSettings(click);
      });
    break;
    case false:
      console.warn('Settings Window : Operation Ended');
    break;
  }
}

function Overview_react(click){
  if(click.target.matches('.options')){
    const lastOption = document.querySelector('.options.active');
    lastOption.classList.remove('active');
    const lastTab = lastOption.getAttribute('data-toggle');
    document.getElementById(lastTab).classList.add('hide');

    click.target.classList.add('active');
    const tab = click.target.getAttribute('data-toggle');
    document.getElementById(tab).classList.remove('hide');
  }
}

function AppSettings(click){
  const app_page = document.querySelector('.fs-app');

  if(click.target.matches('.option-theme')){
    const lastOption = document.querySelector('.option-theme.active');
    lastOption.classList.remove('active');

    click.target.classList.add('active');
    const getDataValue = click.target.getAttribute('data-value');
    app_page.classList.replace(lastOption.getAttribute('data-value'), getDataValue);
  }
}