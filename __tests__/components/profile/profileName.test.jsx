import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileName from "../../../components/profile/profileName"

const TZ_PROFILE_EXISTS = {alias:"TzProfile Exists"}
const TZ_ADDRESS_FXHASH = "tz1LRugk5K1StypSUpwtRTwkc3J2KriyCNTL" //patxol
const TZ_PROFILE_DOESNT_EXISTS = {alias:null}
const TZ_ADDRESS_NOFXHASH_TEZDOMAIN = "tz1hAAB5Zi8KPtRyEsTvn7X89dvNfpGTLfXh" //boutique.tez

describe('Profile Name', () => {

  it('displays a profile name if TezProfil exists', () => {
    render(<ProfileName artist_profile={TZ_PROFILE_EXISTS} artist_address={TZ_ADDRESS_NOFXHASH_TEZDOMAIN}/>)
    const profileName = screen.getByText(TZ_PROFILE_EXISTS.alias)
    expect(profileName).toBeInTheDocument()
    
})
it.skip.failing('displays a profile name if fxhash profile exists', () => {
    render(<ProfileName artist_profile={TZ_PROFILE_DOESNT_EXISTS} artist_address={TZ_ADDRESS_FXHASH}/>)
    const profileName = screen.getByText("patxol")
    
    expect(profileName).toBeInTheDocument()
})
it.skip.failing('displays a profile name if tezos domain exists', () => {
    render(<ProfileName artist_profile={TZ_PROFILE_DOESNT_EXISTS} artist_address={TZ_ADDRESS_NOFXHASH_TEZDOMAIN}/>)
    const profileName = screen.getByText("boutique.tez")
    
    expect(profileName).toBeInTheDocument()
  })
})