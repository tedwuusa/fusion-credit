import Head from "next/head"
import React from "react"
import { useWeb3React } from "@web3-react/core"
import styles from "../styles/Home.module.css"
import EthAccount from "../components/EthAccount"
import { Contract, utils } from "ethers"
import FusionCredit from "../artifacts/contracts/FusionCredit.sol/FusionCredit.json"

export default function Score() {
  const web3React = useWeb3React()
  const [score, setScore] = React.useState({score: null, version: null, timestamp: null})

  async function getScore(event) {
    event.preventDefault()

    const address = utils.getAddress(event.target.address.value)
    console.log("Getting score for address: " + address)

    const contractAddress = "0x570873f17e7c7b7736d79f357D36299ca2d13311"
    const contract = new Contract(contractAddress, FusionCredit.abi, web3React.library)

    const res = await contract.getScore(address)
    setScore({score: parseInt(res.score), version: parseInt(res.version), timestamp: parseInt(res.timestamp)})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Fusion Credit Score</title>
        <meta name="description" content="Retrieve Fusion Credit Score" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img src="/img/fusion-credit-wb.png" width="250"></img>
        <h1 className={styles.title}>
          Retrieve Fusion Credit Score
        </h1>

        <p className={styles.description}>
          Retrieve Fusion Credit Score by entering an address 🚀🚀🚀
        </p>

        <EthAccount showDisconnect={false}/>

        {web3React.active && <>

          { score.score > 0 && <div><p>Your score is {score.score}</p></div> }

          { score.score === 0 && <p>You don't have a score</p> }

          { score.score === null && 
            <form className={styles.formctn} onSubmit={getScore}>
              <div>
                Address: <input name="address" className={styles.formfield} placeholder="Enter Address" />
              </div>
              <div className={styles.formbuttonctn}>
                <input className={styles.button} type="submit" value="Get Fusion Score" />
              </div> 
            </form>
          }

        </>}
      </main>
    </div>
  )
}