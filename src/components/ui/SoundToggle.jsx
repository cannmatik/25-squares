import { Button } from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import soundManager from '@/lib/sounds'

const SoundToggle = ({ muted, onToggle }) => (
    <Button
        variant="contained"
        color="secondary"
        onClick={() => { soundManager.playClick(); onToggle() }}
        sx={{ minWidth: '40px', width: '40px', height: '40px', p: 0 }}
    >
        {muted ? <VolumeOffIcon sx={{ fontSize: 20 }} /> : <VolumeUpIcon sx={{ fontSize: 20 }} />}
    </Button>
)

export default SoundToggle
