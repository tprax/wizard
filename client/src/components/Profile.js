import React from 'react'
import { 
  Grid,
  Divider,
  Button,
  Container,
  Image,
  Header,
  Form,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'

class Profile extends React.Component {
  state = { 
    editing: false, 
    formValues: { name: '', email: '', file: '' },
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props
    const { formValues, editing } = state
    if (user.name !== formValues.name && !editing) {
      return { formValues: { name: user.name, email: user.email } }
    }
  }

  onDrop = (files) => {
    this.setState( state => {
      return {
        formValues: {
          ...state.formValues,
          file: files[0]
        }
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState( state => { 
      return {
        formValues: {
          ...state.formValues,
          [name]: value
        }
      }
    })
  }

  editView = () => {
    const { formValues: { name, email, file } } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
          >
            { file && <Image src={file.preview} alt="upload preview" /> }
          </Dropzone>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form.Input
            label="Name"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
            type="email"
          />
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    )
  }

  toggleEdit = () => {
    //this.setState({ editing: !this.state.editing })
    //this.setState( state => {
    //  return { editing: !state.editing }
    //})

    this.setState( state => ( { editing: !state.editing } ) )
  }

  profileView = () => {
    const { user } = this.props

    return (
      <>
        <Grid.Column width={4}>
          <Image src={user.image || defaultImage} alt="user avatar" />
        </Grid.Column>
        <Grid.Column width={8}>
          <Header as="h1">{user.name}</Header>
          <Header as="h1">{user.email}</Header>
        </Grid.Column>
      </>
    )
  }

  render() {
    const { editing } = this.state
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            { editing ? this.editView() : this.profileView() }
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                { editing ? 'Cancel' : 'Edit' }
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)