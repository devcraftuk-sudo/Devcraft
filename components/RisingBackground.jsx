export default function RisingBackground({ local = false, cubeCount = 10 }) {
    return (
        <div
            className={`rise-3d-fx ${local ? 'rise-3d-fx--local' : 'rise-3d-fx--global'}`}
            aria-hidden="true"
        >
            <div className="rise-3d-cubes">
                {Array.from({ length: cubeCount }, (_, index) => (
                    <span key={index} />
                ))}
            </div>
        </div>
    );
}
