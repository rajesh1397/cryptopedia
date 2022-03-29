import React,{useState,useEffect} from 'react'
import { useGetCryptoDetailQuery } from '../services/cryptoApi'
import { useParams } from 'react-router-dom'
import { Typography, Row, Col, Statistic, Card } from 'antd';

const Cryptodetail = () => {

  const { coinId } = useParams();
  const { data: cryptoDetail, isFetching } = useGetCryptoDetailQuery(coinId);
  // console.log('cryptoDetail',cryptoDetail?.data?.coin)
  const [coinDetail, setCoinDetail] = useState();

  useEffect(() => {
    setCoinDetail(cryptoDetail?.data?.coin)
  }, [cryptoDetail]);

  if (isFetching) return <h2 className='loader'>Loading...</h2>;

  return (
    <>
          <Typography.Title level={2} className="heading">{coinDetail?.name} CryptoCoin Stats</Typography.Title>
          <Row gutter={[128, 32]}>
            <Col span={12}><Statistic title="Total No.of markets" value={coinDetail?.numberOfMarkets} /></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={coinDetail?.numberOfExchanges} /></Col>
            <Col span={12}><Statistic title="Total Market Cap:" value={`$${coinDetail?.marketCap}`} /></Col>
            <Col span={12}><Statistic title="Coin Name" value={coinDetail?.name} /></Col>
            <Col span={12}><Statistic title="Price" value={`$${coinDetail?.price}`} /></Col>
            <Col span={12}><Statistic title="Rank" value={coinDetail?.rank} /></Col>
          </Row>
      <Card
        title={'Coin decsription'}
        headStyle={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: coinDetail?.color
        }}
        extra={<img width='75px' height='75px' src={coinDetail?.iconUrl} alt='crypto' />}
        hoverable
      >
        {coinDetail?.description}
      </Card>
    </>
  )
}

export default Cryptodetail