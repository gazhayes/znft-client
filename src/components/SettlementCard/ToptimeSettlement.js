import { Button } from "antd";
import React from "react";
import { settle } from "../../utils/toptime-functions";

class TopTimeSettlementCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
      settled: false,
    };
  }

  settle = () => {
    this.setState({ buttonLoading: true }, async () => {
      const tx = await settle(this.props.data.id, this.props.signer);
      if (!tx.error) {
        this.setState({ buttonLoading: false, settled: true });
      } else {
        this.setState({ buttonLoading: false });
      }
    });
  };

  render() {
    const { data } = this.props;
    const { buttonLoading, settled } = this.state;
    const time =
      parseFloat(data.toptime) -
      (Date.now() / 1000 - parseFloat(data.highestBidAt));
    return (
      <div className="nft-card">
        <h1>
          # {data.id} <span style={{ fontSize: "1.0rem" }}>Auction Id</span>
        </h1>
        <div>
          <p>
            Bid Amount
            <br />
            <span className="special-text">
              USD {data.highestBid / 10 ** 8}
            </span>
          </p>
          <p>
            Settlement Hash
            <br />
            {data.paymentHash ? (
              <a href={data.paymentHash} target="_blank" rel="noreferrer">
                Click Here
              </a>
            ) : (
              <p>USER PAYMENT NOT MADE</p>
            )}
          </p>
        </div>
        {data.isSettled || settled ? (
          <h1 style={{ color: "#28cd88" }}>SETTLED PRODUCT</h1>
        ) : time <= 0 ? (
          <>
            <Button
              className="primary-button mt-20"
              onClick={() => {
                this.settle();
              }}
              loading={buttonLoading}
              disabled={!data.paymentHash}
            >
              SETTLE SALE
            </Button>
          </>
        ) : (
          <h1>TOPTIME NOT ENDED</h1>
        )}
      </div>
    );
  }
}

export default TopTimeSettlementCard;
