// const knex = require('knex');
// const configuration = require('../../knexfile');//importo o arquivo de configurações do knexfile

// //criando a conexão com o banco
// const connection = knex(configuration.development);

// //exporta a conexão com o banco de dados
// module.exports = connection;

// var pg = require('pg');
// const config = {
//     user: 'postgres',
//     database: 'chamados',
//     password: 'e8f)Gf~U&2]9',
//     port: 5432,
//     host: '104.45.148.219'
// };

// const pool = new pg.Pool(config);

// (async () => {
//     const { rows } = await pool.query("select count(*) from chamado")
//     console.log('chamados:', rows[0])
// })()

// module.exports = pool

// "hostDB": "104.45.148.219"
// "userDB": "postgres",
// "passwordDB": "e8f)Gf~U&2]9",

const { Sequelize, DataTypes, Deferrable } = require('sequelize');
const { serialize } = require('v8');

const { userDB, passwordDB, hostDB, portDB, nameDB } = JSON.parse(require('fs').readFileSync('src/keys.json'));

const sequelize = new Sequelize(`postgres://${userDB}:${passwordDB}@${hostDB}:${portDB}/${nameDB}`);

(async() => {
    try{
        await sequelize.authenticate();
        console.log(`Conexão com o banco ${hostDB} estabelecida`)
    }catch(e){
        console.log('Ocorreu um erro:',e)
    }   

    try{
        sequelize.define('Usuario',{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'id'
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'login'
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'senha'
            }
        },{
            tableName: "usuario",
            timestamps: false
        });
        
        sequelize.define('Pessoa',{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                field: 'id'
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'nome'
            },
            ongnome: {
                type: DataTypes.STRING,
                allowNull: false                
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'email'
            },
            userid: {
                field: 'userid',
                type: DataTypes.INTEGER,        
                references: {
                    model: sequelize.model.Usuario,
                    key: 'id',
                    field: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
            }
        },{
            tableName: "pessoa",
            timestamps: false
        });
        
        sequelize.define('Chamado',{
            id: {
                field: 'id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true                               
            },
            titulo: {
                field: 'titulo',
                type: DataTypes.STRING,
                allowNull: false 
            },
            descricao: {
                field: 'descricao',
                type: DataTypes.STRING,
                allowNull: false                
            },
            anexoid: {
                field: 'anexoid',
                type: DataTypes.STRING,
                allowNull: true                
            },
            arrecadado: {
                field: 'arrecadado',
                type: DataTypes.REAL,
                allowNull: true                
            },            
            fechado: {
                field: 'fechado',
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false                
            },
            pessoaid: {
                field: 'pessoaid',
                type: DataTypes.INTEGER,                
                references: {
                    model: sequelize.model.Pessoa,
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
            }
        },{
            tableName: "chamado",
            timestamps: false
        });

        sequelize.define('ChamadoParticipantes',{
            id: {
                field: 'id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true                
            },
            ChamadoId: {
                field: 'chamadoid',
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.model.Chamado,
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                },
                onDelete: 'cascade' 
            },
            PessoaId:{
                field: 'pessoaid',
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.model.Pessoa,
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                },                
            }
        },{
            tableName: "chamado_participantes",
            timestamps: false,
        });        
        
        sequelize.models.Usuario.hasOne(sequelize.models.Pessoa,{
            foreignKey: 'userid'
        });
        
        sequelize.models.Pessoa.belongsTo(sequelize.models.Usuario,{
            foreignKey: 'userid'
        });
        

        sequelize.models.Pessoa.hasMany(sequelize.models.Chamado,{
            foreignKey: 'pessoaid'
        });
        sequelize.models.Chamado.belongsTo(sequelize.models.Pessoa,{
            foreignKey: 'pessoaid'
        });

        sequelize.models.Chamado.belongsToMany(sequelize.models.Pessoa,{
            through: sequelize.models.ChamadoParticipantes,
            as: 'Participantes'
        });

        console.log('models created')
        // const elano = await sequelize.models.Usuario.findOne({
        //     where: {
        //         login: 'elano'
        //     }
        // })
        // const pessoa = await elano.getPessoa();
        // const chamados = await pessoa.getChamados()
        // const chamado1 = chamados[0];
        // const participantes = await chamado1.getParticipantes();
        // console.log(participantes);
    }catch(e){
        console.log(e)
    }

})();

module.exports = sequelize;