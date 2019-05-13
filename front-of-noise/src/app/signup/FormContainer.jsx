import React, {Component} from 'react';

/* Import Components */
import {
  Field,
  Control,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Help,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';


const SignupButton = ({ icon, name, onClick }) => (
  <div className="field">
    <p className="control button is-small is-warning" style={{ width: '275px' }} onClick={onClick}>
      <span className="icon">
        <i className={`fab fa-${icon}`} aria-hidden="true"></i>
      </span>
      <span>{`Sign Up With ${name}`}</span>
    </p>
  </div>
);

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
        about: '',
        email: '',
        password: '',
        termsAccepted: false
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
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
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

    handleEmail(e) {
       let value = e.target.value;
       this.setState( prevState => ({ newUser :
            {...prevState.newUser, email: value
            }
          }), () => console.log(this.state.newUser))
      }

      handlePassword(e) {
         let value = e.target.value;
         this.setState( prevState => ({ newUser :
              {...prevState.newUser, password: value
              }
            }), () => console.log(this.state.newUser))
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
      <section className="section">
        <Tile renderAs="article" notification color="primary">
        <div style={{ margin: '10px 8px 10px' }}>
        <Heading>Sign up!</Heading>
        <Heading subtitle>or <a href="/signin">sign in</a>~</Heading>
          <SignupButton icon="google" name="Google" onClick={this.loginWithProvider} />
          <SignupButton icon="twitter" name="Twitter" onClick={this.loginWithProvider} />
          <SignupButton icon="facebook" name="Facebook" onClick={this.loginWithProvider} />

          <span style={{ verticalAlign: 'middle', padding: '0 10px' }}><hr /> OR <hr /></span>
          <form
            onSubmit={e => {
              e.preventDefault();
              this.handleSubmit();
            }}>
        <Field>
        <Label>First name: </Label>
        <Control>
        <Input inputType={'text'}
               title= {'First Name'}
               name= {'fname'}
               value={this.state.newUser.fname}
               placeholder = {'Chanandler'}
               handleChange = {this.handleInput} />
        </Control>
        </Field>

        <Field>
        <Label>Last name: </Label>
        <Control>
        <Input inputType={'text'}
              title= {'Last Name'}
              name= {'lname'}
              value={this.state.newUser.lname}
              placeholder = {'Bong'}
              handleChange = {this.handleInput} />
        </Control>
        </Field>  {/* Name of the user */}


        <Field>
        <Label>Age: </Label>
        <Control>
          <Input inputType={'number'}
                name={'age'}
                 title= {'Age'}
                 value={this.state.newUser.age}
                placeholder = {'Enter your age'}
                 handleChange={this.handleAge} />
        </Control>
        </Field> {/* Age */}


        <Field>
        <Label>Gender: </Label>
        <Control>
        <Select title={'Gender'}
                name={'gender'}
                options = {this.state.genderOptions}
                value = {this.state.newUser.gender}
                placeholder = {'Select gender'}
                handleChange = {this.handleInput}
        />
        </Control>
        </Field> {/* Gender */}

        <Field>
        <Label>Email: </Label>
        <Control>
          <Input inputType={'email'}
                 title= {'email'}
                 name= {'email'}
                 // value={this.state.User.email}
                 placeholder = {'Chanandler@email.co.tk'}
                 handleChange = {this.handleInput} />
         </Control>
         </Field>

         <Field>
         <Label>Password: </Label>
         <Control>
         <Input inputType={'password'}
                title= {'password'}
                name= {'password'}
                // value={this.state.User.password}
                placeholder = {'53cR3t!'}
                handleChange = {this.handleInput} />
        </Control>
        </Field>

        <Field>
        <Label>Genre preferences: Rock, Pop, Hip-Hop, Electronic </Label>
        <Control>
          <Checkbox  title={'Genres'}
                  name={'genres'}
                  options={this.state.genreOptions}
                  selectedOptions = { this.state.newUser.genres}
                  handleChange={this.handleCheckBox}
          />
          </Control>
          </Field> {/* Genre Favorites */}

          <Field>
          <Label>Anything else?</Label>
          <Control>
          <Textarea
            title={'About you.'}
            rows={10}
            value={this.state.newUser.about}
            name={'currentPetInfo'}
            handleChange={this.handleTextArea}
            placeholder={'Let us get to know you, pal!'}
            />
            </Control>
            </Field> {/* About you */}

          <Button
            SignupButton
              // action = {this.handleFormSubmit}
              // type = {'primary'}
              // title = {'Submit'}
              // style={buttonStyle}
          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}


        </form>
        </div>
        </Tile>
        </section>

    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
};

export default FormContainer;
