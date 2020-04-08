
// let input_flag = 0;
window.onload = function() {
  let input_flag = 0;
    document.getElementById('search-icon').onclick = function() {
      let input = document.getElementById('input');
      let btn_input = document.getElementById('btn-input');
      if(input_flag === 0) {
        this.style.display = 'none';
        btn_input.style.width = '250px';
        input.style.opacity = 1;
        input.style.visibility = 'visible';
        input.style.width='100%';
        input.style.height='100%';
        input.focus();
        input_flag = 1;
      } else {
        this.style.display = 'initial';
        btn_input.style.width = '50px';
        input.style.opacity = '0';
        input.style.visibility = 'hidden';
        input.style.width='0%';
        input.style.height='0%';
        console.log('desativou');
        input_flag = 0;
      }
    }
}