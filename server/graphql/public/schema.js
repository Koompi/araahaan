const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLError
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        f_name: { type: GraphQLString },
        l_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }
})

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parentValue, args) => {
                let user = {id: "001", f_name: "Brilliant", l_name: "PHAL", email: "mrrbrilliantwork@gmail.com", password: "123"}
                return user;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType
});