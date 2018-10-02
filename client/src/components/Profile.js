import React from 'react'
import {
  Grid,
  Button,
  Divider,
  Container,
  Image,
  Header,
  Form,
} from 'semantic-ui-react'
import {connect} from 'react-redux'
const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png'

class Profile extends React.Component{
  state = {
    editing: false,
    formValues: {name: '', email: ''}
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      formValues:{
        ...this.state.formValues,
        [name]:value
      }
    })
  }

  editView = () => {
    const { formValues: {name, email}} = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
      <Grid.Column width={4}>

      </Grid.Column>
      <Grid.Column width={8}>
        <Form.Input
        label="Name"
        name="name"
        value={name}
        onChange={this.handleChange}
        />
        <Form.Input
        label="Email"
        name="email"
        value={email}
        onChange={this.handleChange}
        type="email"
        />
      </Grid.Column>
      <Button>Update</Button>
      </Form>
    )
  }
  profileView = () => {
    const {user} = this.props
    return (
    <>
      <Grid.Column width={4}>
        <Image src={user.image || defaultImage} alt="user avatar" />
      </Grid.Column>
      <Grid.Column width={8}>
        <Header as='h1'>{user.name}</Header>
        <Header as='h1'>{user.email}</Header>
      </Grid.Column>
    </>
    )
  }

  toggleEdit = () => {
    this.setState( state => ( { editing: !state.editing }))
  }

  render(){
    const { editing } = this.state
    return(
      <Container>
        <Divider hidden>
        <Grid>
          <Grid.Row>
            {editing ? this.editView() :this.profileView()}
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Divider>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Profile)