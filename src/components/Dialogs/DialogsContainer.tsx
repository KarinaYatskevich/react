import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reduse'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state:any) => {
    return{
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch:any) => {
    return{
        updateNewMessageBody: (body:any) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)