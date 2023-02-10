import nodemailer from "nodemailer";

export const emailConfirmarCita = async(datos)=>{
    const {email, nombre, usuario, fecha, hora} = datos;
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
 
    const info = await transport.sendMail({
        from: '"TECNM Agenda de Citas" <citasP@tecnm.mx>',
        to: email,
        subject: "Agenda Citas - Confirma la Cita",
        text: "Porfavor confirma la cita que se te mando",
        html:
        `
        <div class="">
            <p>Hola Se te asigno una cita para la fecha: ${fecha} y la hora : ${hora}</p>
            <p>Sigue el siguiente enlace para poder Confirmar la cita de ${nombre}</p>
            <p>En caso de querer cancelarla preciione el boton de cancelar</p>
            <a class="" href="#">Confirmar Cita</a>
            <br>
            <a class="" href="#">Cancelar Cita</a>
        </div>`
    });
}

export const emailCitaCancelada = async (datos)=>{
    const {fecha, hora, email} = datos;
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const info = await transport.sendMail({
        from: '"TECNM Agenda de Citas" <citasP@tecnm.mx>',
        to: email,
        subject: "Agenda Citas - Cancelación de Cita",
        html:
        `
        <div class="">
            <p>Hola se le avisa que la cita para el dia: ${fecha} y la hora : ${hora} ha sido cancelada</p>
            <p>En caso de querer agendar una nuevamente una cita ingrese a traves del siguiente enlace</p>
            <a class="" href="#">Agendar Cita</a>
        </div>`
    });
}