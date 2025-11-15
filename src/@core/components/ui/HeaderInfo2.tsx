

interface Props {
    title: string
    description: string
    onAddNew?: string
    addButtonText?: string
}

const HeaderInfo: React.FC<Props> = ({ title, description, }) => {
  return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-4 " >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
            <p className="text-white/70 text-sm">
              {description}
            </p>
          </div>
         
        </div>
      </div>
  )
}

export default HeaderInfo