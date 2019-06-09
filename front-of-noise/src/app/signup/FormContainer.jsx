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
import Section from 'react-bulma-components/lib/components/section';
import Modal from 'react-bulma-components/lib/components/modal';


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
        first_name: '',
        last_name: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        zip_ext: '',
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
        {...prevState.newUser, first_name: value
        }
      }), () => console.log(this.state.newUser))
  }

  handleLastName(e) {
     let value = e.target.value;
     this.setState( prevState => ({ newUser :
          {...prevState.newUser, last_name: value
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

    fetch('/new_person/',{
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
          first_name: '',
          last_name: '',
          phone: '',
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          zip_ext: '',
          age: '',
          gender: '',
          genrePrefs: [],
          about: '',
          email: '',
          password: '',
          termsAccepted: false
        },
      })
  }

  render() {
    return (
      <Section>
      <Tile kind="parent">
        <Tile renderAs="article" kind="child" notification color="info">

        <Heading size="2" weight="semibold" spaced >Sign up!</Heading>
        <Heading subtitle>or <a href="/signin">sign in</a>~</Heading>

        <Section size="3by3">
          <div className="has-text-centered">
          <SignupButton icon="google" name="Google" onClick={this.loginWithProvider} />
          <SignupButton icon="twitter" name="Twitter" onClick={this.loginWithProvider} />
          <SignupButton icon="facebook" name="Facebook" onClick={this.loginWithProvider} />
          </div>
        </Section>

          <Section>
            <div className="container box" style={{ maxWidth: '600px' }}>
          <form
            onSubmit={e => {
//              e.preventDefault();
              this.handleFormSubmit();
            }}>

          <Section>
          <Field>
          <Label>First name: </Label>
          <Control>
          <Input inputType={'text'}
                 title= {'First Name'}
                 name= {'first_name'}
                 value={this.state.newUser.first_name}
                 placeholder = {'Chanandler'}
                 handleChange = {this.handleFirstName} />
          </Control>
          </Field>

          <Field>
          <Label>Last name: </Label>
          <Control>
          <Input inputType={'text'}
                title= {'Last Name'}
                name= {'last_name'}
                value={this.state.newUser.last_name}
                placeholder = {'Bong'}
                handleChange = {this.handleLastName} />
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
          <Label>Phone: </Label>
          <Control>
            <Input inputType={'phone'}
                  name={'phone'}
                  title= {'Phone'}
                  value={this.state.newUser.phone}
                  placeholder = {'xxx-xxx-xxxx'}
                  handleChange={this.handlePhone} />
          </Control>
          </Field> {/* Phone number */}

          <Field>
          <Label>Address: </Label>
          <Control>
            <Input inputType={'text'}
                  name={'address'}
                  title= {'Address'}
                  value={this.state.newUser.address1}
                  placeholder = {'123 Fake Street'}
                  handleChange={this.handleAddress} />
          </Control>
          </Field> {/* Address */}

          <Field>
          <Label>City, State: </Label>
          <Control>
            <Input inputType={'text'}
                  name={'citystate'}
                  title= {'CityState'}
                  value={this.state.newUser.city}
                  placeholder = {'Springfield, OH'}
                  handleChange={this.handleCity} />
          </Control>
          </Field> {/* City, State */}

          <Field>
          <Label>Gender: </Label>
          <Control>
          <Select title={'Gender'}
                  name={'gender'}
                  options = {this.state.genderOptions}
                  value = {this.state.newUser.gender}
                  placeholder = {'Select gender'}
                  handleChange = {this.handleChange}
          />
          </Control>
          </Field> {/* Gender */}

          <Field>
          <Label>Email: </Label>
          <Control>
            <Input inputType={'email'}
                   title= {'email'}
                   name= {'email'}
                   value={this.state.newUser.email}
                   placeholder = {'Chanandler@email.co.tk'}
                   handleChange = {this.handleEmail} />
           </Control>
           </Field>

          <Field>
          <Label>Password: </Label>
          <Control>
          <Input inputType={'password'}
                  title= {'password'}
                  name= {'password'}
                  value={this.state.newUser.password}
                  placeholder = {'53cR3t!'}
                  handleChange = {this.handlePassword} />
          </Control>
          </Field>

          <Field>
          <Label>Genre preferences: Rock, Pop, Hip-Hop, Electronic </Label>
          <Control>
            <Checkbox title={'Genres'}
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
              rows={2}
              value={this.state.newUser.about}
              name={'currentUserInfo'}
              handleChange={this.handleTextArea}
              placeholder={'Let us get to know you, pal!'}
            />
          </Control>
          </Field> {/* About you */}

          <Field>
          <Control>
            <Checkbox>
              I agree to the
              <div>
               <Button onClick={this.open}>terms and conditions.</Button>
               <Modal show={this.state.show} onClose={this.close} {...this.props.modal}>
                 {this.props.children}
               </Modal>
             </div>
            </Checkbox>
          </Control>
          </Field> {/* accept terms */}

          </Section>

          <Section>
          <Button
            className={"control button is-small is-warning"}
            action = {this.handleFormSubmit}
            type = {'primary'}
            title = {'Submit'}
            outlined = {false}
            style= {{ margin: '10px', width: '100px', padding:'20px' }}
          >Submit </Button>
        { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            outlined = {true}
            className={"control button is-small is-warning"}
            style= {{ margin: '10px', width: '100px', padding:'20px' }}
          >Clear</Button> {/* Clear the form */}
          </Section>

        </form>
        </div>
        </Section>

        </Tile>
        </Tile>
        </Section>

    );
  }
}

// const buttonStyle = { padding:'10px 10px 10px 10px' };

export default FormContainer;
