import React, {Component} from 'react';

/* Import Components */
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        fname: '',
        lname: '',
        age: '',
        gender: '',
        genrePrefs: [],
        about: ''

      },

      genderOptions: ['Male', 'Female', 'Nonbinary'],
      genreOptions: ['Rock', 'Pop', 'Hip Hop', 'Electronic']

    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleFirstName(e) {
   let value = e.target.value;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, fname: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleLastName(e) {
     let value = e.target.value;
     this.setState( prevState => ({ newUser :
          {...prevState.newUser, lname: value
          }
        }), () => console.log(this.state.newUser))
    }

  handleAge(e) {
       let value = e.target.value;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, age: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser, about: value
      }
      }), ()=>console.log(this.state.newUser))
  }


  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if(this.state.newUser.skills.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.genrePrefs.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.newUser.genrePrefs, newSelection];
    }

      this.setState( prevState => ({ newUser:
        {...prevState.newUser, genrePrefs: newSelectionArray }
      })
      )
}

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('http://example.com',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }

  handleClearForm(e) {

      e.preventDefault();
      this.setState({
        newUser: {
          fname: '',
          lname: '',
          age: '',
          gender: '',
          genrePrefs: [],
          about: ''
        },
      })
  }

  render() {
      
   
    return (

        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

        <Input inputType={'text'}
               title= {'First Name'}
               name= {'fname'}
               value={this.state.newUser.fname}
               placeholder = {'Chanandler'}
               handleChange = {this.handleInput} />

       <Input inputType={'text'}
              title= {'Last Name'}
              name= {'lname'}
              value={this.state.newUser.lname}
              placeholder = {'Bong'}
              handleChange = {this.handleInput} />

              {/* Name of the user */}

          <Input inputType={'number'}
                name={'age'}
                 title= {'Age'}
                 value={this.state.newUser.age}
                placeholder = {'Enter your age'}
                 handleChange={this.handleAge} /> {/* Age */}


          <Select title={'Gender'}
                  name={'gender'}
                  options = {this.state.genderOptions}
                  value = {this.state.newUser.gender}
                  placeholder = {'Select Gender'}
                  handleChange = {this.handleInput}
                  /> {/* Gender */}
          <CheckBox  title={'Genres'}
                  name={'genres'}
                  options={this.state.genreOptions}
                  selectedOptions = { this.state.newUser.genres}
                  handleChange={this.handleCheckBox}
                   /> {/* Genre Favorites */}
          <TextArea
            title={'About you.'}
            rows={10}
            value={this.state.newUser.about}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Let us get to know you, pal!'} />{/* About you */}

          <Button
              action = {this.handleFormSubmit}
              type = {'primary'}
              title = {'Submit'}
            style={buttonStyle}
          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}

        </form>

    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;
