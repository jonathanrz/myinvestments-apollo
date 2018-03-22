import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import currentUserQuery from "../queries/CurrentUser";

export default WrappedComponent => {
  class RequireAuth extends React.Component {
    componentWillUpdate(nextProps) {
      const { loading, me } = nextProps.data;
      if (!loading && !me) nextProps.history.push("/login");
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(withRouter(RequireAuth));
};
