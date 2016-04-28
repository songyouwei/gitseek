import React, {
  PropTypes,
  Component,
  Image,
  StyleSheet,
  View,
}  from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

export default class StatefulImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  render() {
    let {source, noCache} = this.props;
    let uri = source.uri;
    // let random = "?random="+Math.random();
    if (uri && noCache) source={uri: uri};
    return (
      <Image
        style={[{justifyContent:'center', alignItems:'center'}, this.props.style]}
        source={source}
        onLoadStart={()=>{
        }}
        onLoad={()=>{
          this.setState({loaded:true});
        }}
        onLoadEnd={()=>{
          this.setState({loaded:true});
        }}
        onError={()=>{
        }}>
        {!this.state.loaded?<LoadingIndicator size='small' />:null}
      </Image>
    );
  }
};
StatefulImage.propTypes = {
  source: PropTypes.any.isRequired,
  // noCache: PropTypes.bool,
};
