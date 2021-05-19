const PSQLStorage = require('../storage/psql.storage')
const { OAuth2ClientsModel, UsersModel } = require('../model')

const insertClients = async () => {
  const clients = await OAuth2ClientsModel.query()
  if (clients.length >= 4) {
    console.log('Skip Clients...')
    return
  }
  const clientsPayload = [
    { clientId: '5rqh1dqvk7rft7ib6eh0alv5mu2v4f', clientSecret: 'JJum46WoWcMynoU1CWlkhL', grants: 'password' }, // Swag.
    { clientId: '6rqh1dqvk7rft7ib6eh0alv5mu2v4f', clientSecret: 'KJum46WoWcMynoU1CWlkhL', grants: 'password' }, // Web
    { clientId: '7rqh1dqvk7rft7ib6eh0alv5mu2v4f', clientSecret: 'LJum46WoWcMynoU1CWlkhL', grants: 'password' }, // Ios
    { clientId: '8rqh1dqvk7rft7ib6eh0alv5mu2v4f', clientSecret: 'MJum46WoWcMynoU1CWlkhL', grants: 'password' } // And.
  ]
  await OAuth2ClientsModel.query().insert(clientsPayload)
}

const insertUsers = async () => {
  const users = await UsersModel.query().where('login', 'in', ['moderator@test.com', 'admin@test.com'])
  if (users.length === 2) {
    console.log('Skip Users...')
    return
  }

  const adminPayload = {
    name: 'AdminName',
    password: '$2a$10$m733QwJ9T/HKzs8YsTMppeh5/iTpIGZigDQbj3NUemwPxzNKtmN0e',
    login: 'admin@test.com',
    role: 'admin'
  }
  const moderatorPayload = {
    name: 'ModeratorName',
    password: '$2a$10$YGFQE2ruzMKVf0XswIqH8.S/cgKRC37hbq5FQKDhNPgscM.iu77UG',
    login: 'moderator@test.com',
    role: 'moderator'
  }
  const usersPayload = [ adminPayload, moderatorPayload ]
  await UsersModel.query().insert(usersPayload)
}

const seed = async () => {
  await PSQLStorage.init()

  await insertClients()
  await insertUsers()
  console.log('Completed.')
}

seed()
