// Stars Component with MUI icons
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const Stars = ({ count, total = 3, size = 16 }) => (
    <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {[...Array(total)].map((_, i) => {
            const filled = i < count
            return filled ? (
                <StarIcon key={i} sx={{ fontSize: size, color: '#FAEC3B' }} />
            ) : (
                <StarBorderIcon key={i} sx={{ fontSize: size, color: 'rgba(236, 236, 236, 0.4)' }} />
            )
        })}
    </div>
)

export default Stars
